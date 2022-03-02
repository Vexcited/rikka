import type {
  EventReadyData,
  EventMessageCreateData
} from "../types/GatewayEvents.js";

export interface OpCodeDispatch {
  /** Dispatch */
  op: 0;

  /**
   * Sequence number, used for resuming sessions and heartbeats
   */
  s: number;

  /** Event's name. */
  t:
    | "READY"
    | "MESSAGE_CREATE"

    /** Event's data. */
  d:
    | EventReadyData
    | EventMessageCreateData
}

export interface OpCodeReconnect {
  /** Reconnect */
  op: 7;

  d: null;
}

export interface OpCodeInvalidSession {
  /** Invalid Session */
  op: 9;

  /**
   * `true` if the session is resumable.
   * `false` if the session is not resumable and should reconnect.
   */
  d: boolean;

  s: null;
  t: null;
}

export interface OpCodeHello {
  /** Hello */
  op: 10;

  d: {
    heartbeat_interval: number;
  }

  s: null;
  t: null;
}

/** Response of Heartbeat (1) when it's successful. */
export interface OpCodeHeartbeatAck {
  /** Heartbeat ACK */
  op: 11;

  s: null;
  t: null;
}

