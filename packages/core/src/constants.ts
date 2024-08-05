import { Config } from '@latitude-data/compiler'
import { CompletionTokenUsage, Message } from 'ai'

export const LATITUDE_DOCS_URL = ''
export const LATITUDE_EMAIL = ''
export const LATITUDE_HELP_URL = ''
export const LATITUDE_SLACK_URL =
  'https://join.slack.com/t/trylatitude/shared_invite/zt-17dyj4elt-rwM~h2OorAA3NtgmibhnLA'
export const HEAD_COMMIT = 'live'
export const LATITUDE_CHANGELOG_URL = ''
export enum CommitStatus {
  All = 'all',
  Merged = 'merged',
  Draft = 'draft',
}

export const HELP_CENTER = {
  commitVersions: `${LATITUDE_DOCS_URL}/not-found`,
}

export enum Providers {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
  Groq = 'groq',
  Mistral = 'mistral',
  Azure = 'azure',
}

export const PROVIDER_EVENT = 'provider-event'
export const LATITUDE_EVENT = 'latitude-event'

export enum ChainEventTypes {
  TextDelta = 'text-delta',
  Step = 'chain-step',
  Complete = 'chain-complete',
}

export type ChainEvent = {
  data: {
    type: ChainEventTypes
    textDelta?: string
    config?: Config
    messages?: Message[]
    usage?: CompletionTokenUsage
  }
  event: typeof LATITUDE_EVENT | typeof PROVIDER_EVENT
}
