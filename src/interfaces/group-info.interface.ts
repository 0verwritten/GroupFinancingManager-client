import type { UserProfile } from "./user-profile.interface"

export interface Group {
  id: number
  members: UserProfile[]
  name: string
}
