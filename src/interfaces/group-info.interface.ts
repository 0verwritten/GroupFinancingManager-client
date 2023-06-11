import { Purchase } from "./purchase.interface"
import type { UserProfile } from "./user-profile.interface"

export interface Group {
  id: number
  members: UserProfile[]
  name: string
  secret_code?: string
  is_owner: boolean
  purchases: Purchase[]
}
