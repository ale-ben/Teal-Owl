export module Config {
	export function checkConfig(): boolean {
		const userProperties = PropertiesService.getUserProperties();
		return userProperties.getProperty("userID") != null && userProperties.getProperty("userID") != "";
	}

	export function resetConfig() {
		PropertiesService.getUserProperties().deleteAllProperties();
	}

	export function getUserID(): string {
		const userProperties = PropertiesService.getUserProperties();
		return userProperties.getProperty("userID") || "";
	}

	export function setUserID(id : string) {
		const userProperties = PropertiesService.getUserProperties();
		userProperties.setProperty("userID", id);
	}
}
