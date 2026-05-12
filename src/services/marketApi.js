const DEFAULT_API_BASE_URL = 'http://localhost:8080'

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
}

export async function getMarketIndexSummary() {
  let response

  try {
    response = await fetch(`${getApiBaseUrl()}/stock/market/indexes/summary`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error) {
    throw new Error('백엔드 서버에 연결할 수 없습니다. http://localhost:8080 서버가 실행 중인지 확인해 주세요.')
  }

  if (!response.ok) {
    throw new Error(`시장 지수 요약 조회 실패: ${response.status}`)
  }

  const payload = await response.json()

  if (payload.code !== 200 || !Array.isArray(payload.result)) {
    throw new Error(payload.message || '시장 지수 요약 응답 형식이 올바르지 않습니다.')
  }

  return payload.result
}

export async function getExchangeRateSummary() {
  let response

  try {
    response = await fetch(`${getApiBaseUrl()}/stock/market/exchange-rate/summary`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error) {
    throw new Error('환율 서버에 연결할 수 없습니다. http://localhost:8080 서버가 실행 중인지 확인해 주세요.')
  }

  if (!response.ok) {
    throw new Error(`환율 요약 조회 실패: ${response.status}`)
  }

  const payload = await response.json()

  if (payload.code !== 200 || !Array.isArray(payload.result)) {
    throw new Error(payload.message || '환율 요약 응답 형식이 올바르지 않습니다.')
  }

  return payload.result
}
