"use client"

import { useState, useEffect } from "react"

// Define the valid state keys
type StateKey = "hospitals" | "treatments" | "pricing"

// Update the ViewType to include both singular and plural forms
type ViewType = "hospital" | "hospitals" | "treatment" | "treatments" | "pricing"

interface ViewTrackerState {
  hospitals: string[]
  treatments: string[]
  pricing: string[]
  lastPrompt: Date | null
}

const STORAGE_KEY = "medconnect_view_tracker"
const THRESHOLD = {
  hospitals: 2, // Show gate after viewing 2 hospitals
  treatments: 2, // Show gate after viewing 2 treatments
  pricing: 1, // Show gate after viewing 1 pricing page
}
const PROMPT_COOLDOWN = 1000 * 60 * 30 // 30 minutes between prompts

// Initialize with default state
const defaultState: ViewTrackerState = {
  hospitals: [],
  treatments: [],
  pricing: [],
  lastPrompt: null,
}

export function useViewTracker() {
  const [state, setState] = useState<ViewTrackerState>(defaultState)
  const [loaded, setLoaded] = useState(false)

  // Debug function to log state
  const debugState = (label: string, stateObj: any) => {
    console.log(`[ViewTracker] ${label}:`, {
      hospitals: Array.isArray(stateObj.hospitals) ? `Array(${stateObj.hospitals.length})` : typeof stateObj.hospitals,
      treatments: Array.isArray(stateObj.treatments)
        ? `Array(${stateObj.treatments.length})`
        : typeof stateObj.treatments,
      pricing: Array.isArray(stateObj.pricing) ? `Array(${stateObj.pricing.length})` : typeof stateObj.pricing,
      lastPrompt: stateObj.lastPrompt,
    })
  }

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY)

        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState)
            debugState("Loaded from localStorage", parsedState)

            // Create a fresh state object with proper structure
            const validatedState: ViewTrackerState = {
              hospitals: [],
              treatments: [],
              pricing: [],
              lastPrompt: null,
            }

            // Only copy arrays if they exist and are arrays
            if (parsedState && typeof parsedState === "object") {
              // Validate hospitals
              if (Array.isArray(parsedState.hospitals)) {
                validatedState.hospitals = parsedState.hospitals
              } else {
                console.warn("[ViewTracker] Invalid hospitals in localStorage:", typeof parsedState.hospitals)
              }

              // Validate treatments
              if (Array.isArray(parsedState.treatments)) {
                validatedState.treatments = parsedState.treatments
              } else {
                console.warn("[ViewTracker] Invalid treatments in localStorage:", typeof parsedState.treatments)
              }

              // Validate pricing
              if (Array.isArray(parsedState.pricing)) {
                validatedState.pricing = parsedState.pricing
              } else {
                console.warn("[ViewTracker] Invalid pricing in localStorage:", typeof parsedState.pricing)
              }

              // Convert lastPrompt string back to Date object if it exists
              if (parsedState.lastPrompt) {
                try {
                  validatedState.lastPrompt = new Date(parsedState.lastPrompt)
                } catch (e) {
                  console.warn("[ViewTracker] Invalid lastPrompt date:", parsedState.lastPrompt)
                }
              }
            }

            debugState("Validated state", validatedState)
            setState(validatedState)
          } catch (parseError) {
            console.error("[ViewTracker] Error parsing localStorage data:", parseError)
            // Reset to default on parse error
            setState(defaultState)
          }
        } else {
          console.log("[ViewTracker] No saved state found in localStorage")
          setState(defaultState)
        }
      } catch (error) {
        console.error("[ViewTracker] Error accessing localStorage:", error)
        // Reset to default on access error
        setState(defaultState)
      }
      setLoaded(true)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      try {
        // Validate state before saving
        const stateToSave: ViewTrackerState = {
          hospitals: Array.isArray(state.hospitals) ? state.hospitals : [],
          treatments: Array.isArray(state.treatments) ? state.treatments : [],
          pricing: Array.isArray(state.pricing) ? state.pricing : [],
          lastPrompt: state.lastPrompt,
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
        debugState("Saved to localStorage", stateToSave)
      } catch (error) {
        console.error("[ViewTracker] Error saving to localStorage:", error)
      }
    }
  }, [state, loaded])

  // Track a view
  const trackView = (type: ViewType, id: string) => {
    if (!loaded) {
      console.log("[ViewTracker] Not loaded yet, skipping trackView")
      return false
    }

    // Map singular form to plural if needed
    let stateKey: StateKey
    if (type === "hospital") stateKey = "hospitals"
    else if (type === "treatment") stateKey = "treatments"
    else if (type === "hospitals") stateKey = "hospitals"
    else if (type === "treatments") stateKey = "treatments"
    else if (type === "pricing") stateKey = "pricing"
    else {
      console.error(`[ViewTracker] Invalid view type: ${type}`)
      return false
    }

    // Safety check - ensure the state has the expected structure
    if (!state || typeof state !== "object") {
      console.error("[ViewTracker] State is not properly initialized")
      return false
    }

    // Create a safe copy of the current state
    const safeState = { ...state }

    // Ensure all arrays exist
    if (!Array.isArray(safeState.hospitals)) safeState.hospitals = []
    if (!Array.isArray(safeState.treatments)) safeState.treatments = []
    if (!Array.isArray(safeState.pricing)) safeState.pricing = []

    // Get the correct array for this type
    const currentArray = safeState[stateKey]

    // Double-check that we have an array
    if (!Array.isArray(currentArray)) {
      console.error(`[ViewTracker] Expected array for ${stateKey} but got ${typeof currentArray}`)

      // Fix the state by creating a new array
      safeState[stateKey] = []
      setState(safeState)
      return false
    }

    // If already tracked, don't add again
    if (currentArray.includes(id)) {
      console.log(`[ViewTracker] ${type} ${id} already tracked`)
      return checkShouldPrompt(stateKey)
    }

    // Create a new state object with the updated array
    const newState = {
      ...safeState,
      [stateKey]: [...currentArray, id],
    }

    console.log(`[ViewTracker] Tracking ${type} ${id}`, {
      before: currentArray.length,
      after: newState[stateKey].length,
    })

    setState(newState)
    return checkShouldPrompt(stateKey)
  }

  // Check if we should show the signup prompt
  const checkShouldPrompt = (type: StateKey): boolean => {
    // Safety check - ensure the state has the expected structure
    if (!state || typeof state !== "object") {
      console.error("[ViewTracker] State is not properly initialized in checkShouldPrompt")
      return false
    }

    // If we recently showed a prompt, don't show again yet
    if (state.lastPrompt) {
      const timeSinceLastPrompt = Date.now() - state.lastPrompt.getTime()
      if (timeSinceLastPrompt < PROMPT_COOLDOWN) {
        console.log("[ViewTracker] Prompt cooldown active, not showing prompt")
        return false
      }
    }

    // Create a safe reference to the state
    const safeState = { ...state }

    // Ensure all arrays exist
    if (!Array.isArray(safeState.hospitals)) safeState.hospitals = []
    if (!Array.isArray(safeState.treatments)) safeState.treatments = []
    if (!Array.isArray(safeState.pricing)) safeState.pricing = []

    // Get the correct array for this type
    const currentArray = safeState[type]

    // Ensure the property exists and is an array before checking length
    if (!Array.isArray(currentArray)) {
      console.error(`[ViewTracker] Expected array for ${type} but got ${typeof currentArray}`)

      // Fix the state
      safeState[type] = []
      setState(safeState)
      return false
    }

    // Check if we've hit the threshold for this type
    const hitThreshold = currentArray.length >= THRESHOLD[type]
    console.log(
      `[ViewTracker] Check threshold for ${type}: ${currentArray.length}/${THRESHOLD[type]} = ${hitThreshold}`,
    )

    if (hitThreshold) {
      // Update the last prompt time
      setState((prev) => {
        // Create a safe copy
        const safePrev = { ...prev }
        if (!Array.isArray(safePrev.hospitals)) safePrev.hospitals = []
        if (!Array.isArray(safePrev.treatments)) safePrev.treatments = []
        if (!Array.isArray(safePrev.pricing)) safePrev.pricing = []

        return {
          ...safePrev,
          lastPrompt: new Date(),
        }
      })
      return true
    }

    return false
  }

  // Reset the tracker (e.g., after signup)
  const resetTracker = () => {
    console.log("[ViewTracker] Resetting tracker")
    setState(defaultState)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("[ViewTracker] Error removing from localStorage:", error)
    }
  }

  // Calculate view counts safely
  const getViewCounts = () => {
    return {
      hospitals: Array.isArray(state.hospitals) ? state.hospitals.length : 0,
      treatments: Array.isArray(state.treatments) ? state.treatments.length : 0,
      pricing: Array.isArray(state.pricing) ? state.pricing.length : 0,
    }
  }

  return {
    trackView,
    resetTracker,
    viewCounts: getViewCounts(),
    loaded,
    // Add a debug method for troubleshooting
    debug: () => debugState("Current state", state),
  }
}
