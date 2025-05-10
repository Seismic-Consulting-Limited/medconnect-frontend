"use client"
import { CheckCircle2, Code, Palette, Layout, Smartphone, Monitor, Zap, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MilestoneReport() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-green-600">Completed</Badge>
          <h2 className="text-sm text-gray-500">Milestone Report</h2>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Homepage Design and Implementation</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Completed on: April 28, 2024</span>
          <span>•</span>
          <span>Lead: Design & Frontend Team</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Key accomplishments and implementation details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                The homepage serves as the primary entry point for MedConnect, designed to introduce users to the
                platform's core value proposition of connecting patients with international healthcare providers. The
                implementation focused on creating a visually appealing, informative, and conversion-optimized landing
                page that clearly communicates the platform's benefits.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Key Components Implemented</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Hero Section</span>: Created a visually striking hero with a gradient
                    background, compelling headline ("Global Healthcare, Simplified"), concise value proposition, and
                    clear call-to-action buttons.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Treatment Search</span>: Implemented a tabbed search interface
                    allowing users to search for treatments, hospitals, or doctors with appropriate filters and popular
                    search suggestions.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Featured Destinations</span>: Designed cards showcasing top medical
                    tourism destinations (Thailand, India, Turkey) with key specialties, cost savings information, and
                    visual elements.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">How It Works</span>: Created a 4-step process visualization explaining
                    the patient journey from finding treatment to receiving care.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Telemedicine Section</span>: Implemented a feature highlight for the
                    virtual consultation capabilities with compelling imagery and benefits.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Travel Support</span>: Created a section showcasing the platform's
                    travel arrangement services with visual icons and concise descriptions.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Testimonials</span>: Implemented a testimonial section with patient
                    success stories, ratings, and geographic diversity to build trust.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Call-to-Action</span>: Added a prominent final CTA section with
                    contrasting background to drive user conversion.
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Highlights</CardTitle>
            <CardDescription>Implementation details and technologies used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Code className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Next.js App Router</h3>
                  <p className="text-sm text-gray-500">
                    Implemented using Next.js App Router for optimized page loading and server-side rendering
                    capabilities.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Tailwind CSS</h3>
                  <p className="text-sm text-gray-500">
                    Utilized Tailwind CSS for responsive design with custom color palette and consistent spacing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layout className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Component Library</h3>
                  <p className="text-sm text-gray-500">
                    Built with shadcn/ui components for consistent UI elements and accessibility compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Responsive Design</h3>
                  <p className="text-sm text-gray-500">
                    Fully responsive implementation with mobile-first approach and adaptive layouts.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Performance Optimization</h3>
                  <p className="text-sm text-gray-500">
                    Optimized images, component lazy loading, and efficient CSS for fast page load times.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="design" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="design">Design Process</TabsTrigger>
          <TabsTrigger value="challenges">Challenges & Solutions</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes & Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="design" className="p-4 border rounded-lg mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Design Process</h3>
            <p className="text-gray-600">
              The homepage design went through multiple iterations to achieve the optimal balance between visual appeal,
              information clarity, and conversion optimization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium mb-2">Research & Planning</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Analyzed 12+ competitor medical tourism platforms</li>
                  <li>• Conducted user interviews with 8 potential medical tourists</li>
                  <li>• Created user personas for international patients</li>
                  <li>• Mapped user journey from awareness to conversion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Design Decisions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Selected purple primary color to convey trust and innovation</li>
                  <li>• Used card-based UI for consistent information presentation</li>
                  <li>• Implemented subtle animations for interactive elements</li>
                  <li>• Created custom iconography for medical specialties</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Design Evolution</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-2">
                  <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-2">
                    <span className="text-gray-400 text-sm">Wireframe</span>
                  </div>
                  <p className="text-xs text-gray-500">Initial wireframe focusing on information architecture</p>
                </div>
                <div className="border rounded-md p-2">
                  <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-2">
                    <span className="text-gray-400 text-sm">Mockup</span>
                  </div>
                  <p className="text-xs text-gray-500">High-fidelity mockup with visual design elements</p>
                </div>
                <div className="border rounded-md p-2">
                  <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-2">
                    <span className="text-gray-400 text-sm">Final</span>
                  </div>
                  <p className="text-xs text-gray-500">Final implementation with refinements from user testing</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="challenges" className="p-4 border rounded-lg mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Challenges & Solutions</h3>
            <p className="text-gray-600">
              Several challenges were encountered during the homepage implementation, requiring creative solutions and
              technical workarounds.
            </p>

            <div className="space-y-6 mt-4">
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <h4 className="font-medium">Challenge: Complex Search Functionality</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Implementing a multi-faceted search that could handle treatments, hospitals, and doctors with
                  different filter options proved challenging.
                </p>
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-green-600">Solution:</h5>
                  <p className="text-sm text-gray-600">
                    Created a tabbed interface with context-specific search fields and filters for each category.
                    Implemented a unified search state management system that adapts based on the selected tab.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <h4 className="font-medium">Challenge: Responsive Hero Section</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Creating a hero section that maintained visual impact across all device sizes while keeping text
                  readable and CTAs accessible.
                </p>
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-green-600">Solution:</h5>
                  <p className="text-sm text-gray-600">
                    Implemented a flexible layout system with custom breakpoints that reorganized content based on
                    screen size. Used responsive typography and adaptive spacing to maintain visual hierarchy.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <h4 className="font-medium">Challenge: Image Optimization</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Balancing high-quality visuals with performance requirements, especially for the destination cards and
                  testimonial sections.
                </p>
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-green-600">Solution:</h5>
                  <p className="text-sm text-gray-600">
                    Utilized Next.js Image component with automatic WebP conversion and responsive sizing. Implemented
                    lazy loading for below-the-fold images and optimized image dimensions for each breakpoint.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <h4 className="font-medium">Challenge: Consistent Cross-Browser Rendering</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Ensuring consistent appearance and functionality across different browsers, particularly for gradient
                  backgrounds and flex layouts.
                </p>
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-green-600">Solution:</h5>
                  <p className="text-sm text-gray-600">
                    Implemented browser-specific CSS fallbacks and used PostCSS with autoprefixer to handle vendor
                    prefixes. Conducted extensive cross-browser testing and created specific fixes for Edge and Safari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="outcomes" className="p-4 border rounded-lg mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Outcomes & Metrics</h3>
            <p className="text-gray-600">
              The homepage implementation has been evaluated against key performance indicators and user experience
              metrics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">96/100</div>
                <div className="text-sm font-medium">Google PageSpeed Score</div>
                <div className="text-xs text-gray-500 mt-1">Mobile: 94, Desktop: 98</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm font-medium">Accessibility Score</div>
                <div className="text-xs text-gray-500 mt-1">WCAG 2.1 AA Compliant</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">&lt;1.2s</div>
                <div className="text-sm font-medium">First Contentful Paint</div>
                <div className="text-xs text-gray-500 mt-1">75th percentile on 4G</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">User Testing Results</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium">Usability Testing</h5>
                  <ul className="space-y-2 text-sm text-gray-600 mt-2">
                    <li>• 92% of users successfully completed primary task flows</li>
                    <li>• Average time to first meaningful action: 8 seconds</li>
                    <li>• 85% of users rated navigation as "very intuitive"</li>
                    <li>• Search functionality received 4.7/5 satisfaction rating</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Conversion Metrics</h5>
                  <ul className="space-y-2 text-sm text-gray-600 mt-2">
                    <li>• 38% click-through rate on primary CTA</li>
                    <li>• 42% of visitors interact with the search functionality</li>
                    <li>• 65% scroll depth (average)</li>
                    <li>• 2:45 average time on page</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Key Learnings</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • Users responded most positively to the destination cards with specific cost savings information,
                  suggesting we should emphasize concrete value propositions
                </li>
                <li>
                  • The tabbed search interface improved engagement compared to earlier prototypes with separate search
                  pages
                </li>
                <li>
                  • Testimonials with specific medical procedures mentioned performed better than generic reviews,
                  informing our content strategy
                </li>
                <li>
                  • Mobile users spent more time on the "How It Works" section than desktop users, suggesting process
                  clarity is particularly important for mobile experiences
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Visual Showcase</CardTitle>
          <CardDescription>Key components of the homepage implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Hero Section</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Monitor className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                The hero section features a gradient background, compelling headline, and clear call-to-action buttons
                that direct users to either find treatment options or learn about provider opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Search Interface</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Monitor className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                The tabbed search interface allows users to search for treatments, hospitals, or doctors with
                context-specific filters and popular search suggestions displayed as clickable tags.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="font-medium mb-3">Destination Cards</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Monitor className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Cards showcasing top medical tourism destinations with key specialties and cost savings information.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">How It Works</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Monitor className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                A 4-step process visualization explaining the patient journey from finding treatment to receiving care.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Testimonials</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Monitor className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Patient success stories with ratings and geographic diversity to build trust and credibility.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button variant="outline">
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back to All Milestones
        </Button>
        <Button className="bg-primary hover:bg-primary-700">Download Detailed Report</Button>
      </div>
    </div>
  )
}
