/*
<ai_context>
Contains server actions related to profiles in the DB.
</ai_context>
*/

"use server"

// import { db } from "@/db/db"
// import { eq } from "drizzle-orm"
import {
  type InsertProfile,
  type SelectProfile,
  profilesTable
} from "@/db/schema/profiles-schema"
import type { ActionState } from "@/types"

export async function createProfileAction(
  data: InsertProfile
): Promise<ActionState<SelectProfile>> {
  console.log("DB Action Disabled: createProfileAction")
  const mockProfile: SelectProfile = {
    userId: data.userId,
    membership: data.membership || "free",
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return { isSuccess: true, message: "Mock success", data: mockProfile }
  /*
  try {
    const [newProfile] = await db.insert(profilesTable).values(data).returning()
    return {
      isSuccess: true,
      message: "Profile created successfully",
      data: newProfile
    }
  } catch (error) {
    console.error("Error creating profile:", error)
    return { isSuccess: false, message: "Failed to create profile" }
  }
  */
}

export async function getProfileByUserIdAction(
  userId: string
): Promise<ActionState<SelectProfile | null>> {
  // Allow null return
  console.log("DB Action Disabled: getProfileByUserIdAction")
  // Return a mock profile for testing UI, or null to simulate not found
  const mockProfile: SelectProfile = {
    userId: userId,
    membership: "pro", // Mock as pro to bypass potential blocks
    stripeCustomerId: "mock_cus_id",
    stripeSubscriptionId: "mock_sub_id",
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return { isSuccess: true, message: "Mock success", data: mockProfile } // Return mock profile
  // return { isSuccess: true, message: "Mock: Profile not found", data: null }; // Or return null

  /*
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profilesTable.userId, userId)
    })
    if (!profile) {
      return { isSuccess: false, message: "Profile not found" }
    }

    return {
      isSuccess: true,
      message: "Profile retrieved successfully",
      data: profile
    }
  } catch (error) {
    console.error("Error getting profile by user id", error)
    return { isSuccess: false, message: "Failed to get profile" }
  }
  */
}

export async function updateProfileAction(
  userId: string,
  data: Partial<InsertProfile>
): Promise<ActionState<SelectProfile>> {
  console.log("DB Action Disabled: updateProfileAction")
  // Return a mock updated profile
  const mockUpdatedProfile: SelectProfile = {
    userId: userId,
    membership: data.membership || "free",
    stripeCustomerId:
      data.stripeCustomerId !== undefined ? data.stripeCustomerId : null,
    stripeSubscriptionId:
      data.stripeSubscriptionId !== undefined
        ? data.stripeSubscriptionId
        : null,
    createdAt: new Date(), // Ideally fetch original
    updatedAt: new Date()
  }
  return { isSuccess: true, message: "Mock success", data: mockUpdatedProfile }
  /*
  try {
    const [updatedProfile] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.userId, userId))
      .returning()

    if (!updatedProfile) {
      return { isSuccess: false, message: "Profile not found to update" }
    }

    return {
      isSuccess: true,
      message: "Profile updated successfully",
      data: updatedProfile
    }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { isSuccess: false, message: "Failed to update profile" }
  }
  */
}

export async function updateProfileByStripeCustomerIdAction(
  stripeCustomerId: string,
  data: Partial<InsertProfile>
): Promise<ActionState<SelectProfile>> {
  console.log("DB Action Disabled: updateProfileByStripeCustomerIdAction")
  // This action is mainly called by Stripe webhook, which is disabled.
  // If called elsewhere, mock a profile.
  const mockUpdatedProfile: SelectProfile = {
    userId: data.userId || `mock-user-for-${stripeCustomerId}`, // Use template literal
    membership: data.membership || "free",
    stripeCustomerId: stripeCustomerId,
    stripeSubscriptionId:
      data.stripeSubscriptionId !== undefined
        ? data.stripeSubscriptionId
        : null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return { isSuccess: true, message: "Mock success", data: mockUpdatedProfile }
  /*
  try {
    const [updatedProfile] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.stripeCustomerId, stripeCustomerId))
      .returning()

    if (!updatedProfile) {
      return {
        isSuccess: false,
        message: "Profile not found by Stripe customer ID"
      }
    }

    return {
      isSuccess: true,
      message: "Profile updated by Stripe customer ID successfully",
      data: updatedProfile
    }
  } catch (error) {
    console.error("Error updating profile by stripe customer ID:", error)
    return {
      isSuccess: false,
      message: "Failed to update profile by Stripe customer ID"
    }
  }
  */
}

export async function deleteProfileAction(
  userId: string
): Promise<ActionState<void>> {
  console.log("DB Action Disabled: deleteProfileAction")
  return { isSuccess: true, message: "Mock success", data: undefined }
  /*
  try {
    await db.delete(profilesTable).where(eq(profilesTable.userId, userId))
    return {
      isSuccess: true,
      message: "Profile deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting profile:", error)
    return { isSuccess: false, message: "Failed to delete profile" }
  }
  */
}
