/*
  Simple smoke test script. Requires the backend server to be running and the
  environment variable API_URL (or defaults to http://localhost:4000).

  Usage:
    node scripts/smoke-test.js
*/

const fetch = globalThis.fetch || (typeof require === 'function' ? require('node-fetch') : undefined)

const API_URL = process.env.API_URL || 'http://localhost:4000'

async function run() {
  try {
    console.log('Checking health endpoint...')
    const res = await fetch(`${API_URL}/health`)
    const text = await res.text()
    console.log('/health status:', res.status, text)
    if (res.status !== 200) process.exit(2)

    console.log('Health ok. Smoke test passed (basic).')
    process.exit(0)
  } catch (err) {
    console.error('Smoke test failed:', err.message)
    process.exit(1)
  }
}

run()
