import { rootStore } from "../index";

let lastIsPlayingAd = undefined;
let savedVolume = undefined;

export function isPlayingAdHook(isPlayingAd: boolean) {
  if(!rootStore.modsController.muteAdsEnabled) return;

  if(lastIsPlayingAd === !isPlayingAd) {
    if(isPlayingAd) {
      savedVolume = rootStore.volumeStore.localVolume;
      while(rootStore.volumeStore.localVolume > 0) {
        rootStore.volumeStore.decreaseVolume();
      }
    } else {
      while(rootStore.volumeStore.localVolume < savedVolume) {
        rootStore.volumeStore.increaseVolume();
      }
    }
  }
  lastIsPlayingAd = isPlayingAd;
}