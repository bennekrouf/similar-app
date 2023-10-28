// netUtils.ts
import NetInfo from '@react-native-community/netinfo';

export async function isInternetReachable() {
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable !== false;
}
