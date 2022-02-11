/**
 * Reference from <https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes>.
 */
export default function handleGatewayClose (code: number) {
  console.error("Gateway closed with code:", code);

  switch (code) {
  case 4003:
    throw new Error("Not authenticated.");
  case 4004:
    throw new Error("Invalid token.");
  }
}