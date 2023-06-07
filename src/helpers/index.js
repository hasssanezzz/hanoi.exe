
export async function sleep(SLEEP_TIME = 1000) {
  await new Promise((r) => setTimeout(r, SLEEP_TIME))
}

export function mapDiscWidth(X, DISC_LENGTH) {
  const A = 1,
    B = DISC_LENGTH,
    C = 20,
    D = 100
  return ((X - A) / (B - A)) * (D - C) + C
}
