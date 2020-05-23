import NetworkManager from './network-manager';

const url = "ws://localhost:8080";
const networkManager = new NetworkManager();
networkManager.connect(url);