import { MainMenuItemId, View } from "../store/SettingsStore";
import SeedableStorageInterface from "../middleware/SeedableStorageInterface";
import { RootStore } from "../store/RootStore";
import { makeAutoObservable } from "mobx";
import { rootStore } from "../index";

export enum ModsMenuItemId {
  MUTE_ADS = "mute_ads",
  SHOW_DEVELOPER_OPTIONS = "show_developer_options",
  DINO = "dino",
}

// use get function to avoid issues resulting from circular dependency
export const getModsView = (): View => ({
  id: MainMenuItemId.MODS,
  label: "Mods",
  index: 0,
  visible: () => true,
  type: "parent",
  rows: [
    {
      id: ModsMenuItemId.MUTE_ADS,
      label: "Mute ads",
      index: 0,
      visible: () => true,
      type: "toggle"
    },
    {
      id: ModsMenuItemId.SHOW_DEVELOPER_OPTIONS,
      label: "Show developer options",
      index: 0,
      visible: () => true,
      type: "toggle"
    },
    {
      id: ModsMenuItemId.DINO,
      label: "Dino game!",
      index: 0,
      visible: () => true,
      type: "parent"
    }
  ]
});

export const isToggleOnHook = (item: View): boolean => {
  switch (item.id) {
    case ModsMenuItemId.MUTE_ADS:
      return rootStore.modsController.muteAdsEnabled;
    case ModsMenuItemId.SHOW_DEVELOPER_OPTIONS:
      return rootStore.modsController.showDeveloperOptionsEnabled;
    default:
      return false;
  }
};

export const getKeyValueHook = (item: View): string | false => {
  return false;
}

export const handleSubmenuItemSelectedHook = (item: View): boolean => {
  switch (item.id) {
    case ModsMenuItemId.MUTE_ADS:
      rootStore.modsController.toggleMuteAdsEnabled();
      return true;
    case ModsMenuItemId.SHOW_DEVELOPER_OPTIONS:
      rootStore.modsController.toggleShowDeveloperOptionsEnabled();
      return true;
    case ModsMenuItemId.DINO:
      if(document.querySelector("#dino-game")) return true;
      const div = document.createElement("div");
      div.style.zIndex = /* max css */ "2147483647";
      div.id = "dino-game";
      const iframe = document.createElement("iframe");
      iframe.src = "static/dino.html";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      div.appendChild(iframe);
      const closeButton = document.createElement("button");
      closeButton.innerText = "Close";
      closeButton.style.position = "absolute";
      closeButton.style.bottom = "0";
      closeButton.style.left = "0";
      globalThis.dinoOpen = true;
      closeButton.addEventListener("click", () => {
        div.remove();
        globalThis.dinoOpen = false;
      });
      div.appendChild(closeButton);
      document.body.appendChild(div);
      iframe.focus();
      return true;
    default:
      return false;
  }
}


const MODS_MUTE_ADS_ENABLED_KEY = 'mods_mute_ads_enabled';
const MODS_SHOW_DEVELOPER_OPTIONS_ENABLED_KEY = 'mods_show_developer_options_enabled';

export class ModsController {
  private persistentStorage: SeedableStorageInterface;

  constructor(
    rootStore: RootStore,
  ) {
    this.persistentStorage = rootStore.persistentStorage;

    // makeObservable(this, { muteAdsEnabled: computed });
    makeAutoObservable(this);
  }

  get muteAdsEnabled(): boolean {
    return Boolean(
      JSON.parse(
        this.persistentStorage.getItem(MODS_MUTE_ADS_ENABLED_KEY) ?? 'true',
      )
    );
  }

  get showDeveloperOptionsEnabled(): boolean {
    return Boolean(
      JSON.parse(
        this.persistentStorage.getItem(MODS_SHOW_DEVELOPER_OPTIONS_ENABLED_KEY) ?? 'false',
      )
    );
  }

  toggleMuteAdsEnabled(): void {
    this.persistentStorage.setItem(
      MODS_MUTE_ADS_ENABLED_KEY,
      JSON.stringify(!this.muteAdsEnabled),
    );
  }

  toggleShowDeveloperOptionsEnabled(): void {
    this.persistentStorage.setItem(
      MODS_SHOW_DEVELOPER_OPTIONS_ENABLED_KEY,
      JSON.stringify(!this.showDeveloperOptionsEnabled),
    );
  }
}