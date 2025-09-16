// lib/mappers/hospital.ts
import type {
  HospitalDetailDTO,
  HospitalListDTO,
  HospitalUI,
  NamedItem,
} from "../types/hospital";

// Convert ["A", {name:"B"}] -> ["A","B"]
function toStringArray(v?: NamedItem[]): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

function firstDefined<T>(...vals: (T | undefined | null)[]): T | undefined {
  for (const v of vals) {
    if (v !== undefined && v !== null) return v as T;
  }
  return undefined;
}

export function mapHospitalListItemToUI(dto: HospitalListDTO): HospitalUI {
  const id = String(dto?.id ?? "");
  const name = String(dto?.name ?? "");
  const description = dto?.description ?? "—";

  const images = [
    dto?.profile_image,
    dto?.cover_image_url,
    dto?.logo_url,
    ...(Array.isArray(dto?.images) ? dto.images : []),
  ].filter(Boolean) as string[];

  return {
    id,
    name,
    description,
    city: dto?.city,
    state: dto?.state,
    country: dto?.country,
    address: dto?.address_1 ?? dto?.address,

    image: images[0] ?? "/placeholder.svg",
    images,

    rating: typeof dto?.rating === "number" ? dto.rating : 0,
    reviews: typeof dto?.reviews_count === "number" ? dto.reviews_count : 0,

    specialties: toStringArray(dto?.specialties),
    accreditations: toStringArray(dto?.accreditations), // ✅ uses `name`
    languages: toStringArray(dto?.languages),

    facilities: [], // list item usually doesn’t include; filled by detail mapper if present
    treatments: [],
  };
}

export function mapHospitalDetailToUI(dto: HospitalDetailDTO): HospitalUI {
  const base = mapHospitalListItemToUI(dto);

  return {
    ...base,
    fullDescription: firstDefined(dto?.fullDescription, dto?.description),
    facilities: toStringArray(dto?.facilities),
    treatments: toStringArray(dto?.treatments),
    languages: toStringArray(dto?.languages), // in case detail has more complete values

    beds: dto?.beds,
    doctors: dto?.doctors,
    founded: dto?.founded,
    internationalPatients: dto?.internationalPatients,

    // Prefer profile_image if present on detail
    image: firstDefined(dto?.profile_image, base.image) ?? "/placeholder.svg",
  };
}
