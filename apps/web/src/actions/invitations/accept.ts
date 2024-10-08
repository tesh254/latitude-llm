'use server'

import {
  unsafelyFindMembershipByToken,
  unsafelyFindWorkspace,
  unsafelyGetUser,
} from '@latitude-data/core/data-access'
import { NotFoundError } from '@latitude-data/core/lib/errors'
import { acceptInvitation } from '@latitude-data/core/services/invitations/accept'
import { setSession } from '$/services/auth/setSession'
import { ROUTES } from '$/services/routes'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const acceptInvitationAction = createServerAction()
  .input(
    z.object({
      membershipToken: z.string(),
      email: z.string().optional(),
    }),
    { type: 'formData' },
  )
  .handler(async ({ input }) => {
    const { membershipToken } = input
    const membership = await unsafelyFindMembershipByToken(
      membershipToken,
    ).then((r) => r.unwrap())
    const workspace = await unsafelyFindWorkspace(membership.workspaceId).then(
      (r) => r.unwrap(),
    )

    const user = await unsafelyGetUser(membership.userId)
    if (!user) throw new NotFoundError('User not found')

    await acceptInvitation({ membership, user })

    setSession({
      sessionData: {
        user,
        workspace: { id: Number(workspace.id), name: workspace.name },
      },
    })

    return redirect(ROUTES.root)
  })
