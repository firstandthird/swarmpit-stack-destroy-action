import * as core from '@actions/core'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    const URL = core.getInput('url')
    const STACK = core.getInput('stack')
    const API_KEY = core.getInput('api-key')

    const headers = {
      Authorization: `Bearer ${API_KEY}`
    }

    const endpoint = `${URL}/api/stacks/${STACK}`

    const destroyResponse = await fetch(endpoint, {
      method: 'delete',
      headers
    })

    if (!destroyResponse.ok) {
      const destroyJSON = await destroyResponse.json()
      return core.setFailed(
        `Destroy failed with status ${
          destroyResponse.status
        } and message: ${JSON.stringify(destroyJSON)}`
      )
    }

    core.info('Destroy succeeded')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.setFailed(error?.message || 'Unknown error')
  }
}

run()