export const currentParticipantsSelector = (state) => {
  let participants = [];
  let currentLobby = currentLobbySelector(state);

    console.log(currentLobby);

  if (currentLobby && currentLobby.participants) {
    console.log('currentLobby.participants', currentLobby.participants);
    participants = currentLobby.participants.map((participant) => {
      return state.users.find((user) => user.id === participant);
    });

    participants = participants.filter(
      (participant) => typeof participant !== "undefined"
    );
  }

  console.log('participants', participants)

  return participants;
};

export const userSelector = (state) => {
  let user = { name: "" };

  if (typeof state.userId === "string" || state.userId !== "") {
    let index = state.users.findIndex((user) => user.id === state.userId);

    if (index >= 0) {
      user = state.users[index];
    }
  }

  return user;
};

export const currentLobbySelector = (state) => {
  return state.lobbies.find(
    (lobby) =>
      lobby.participants.filter((participant) => participant === state.userId)
        .length > 0
  );
};
