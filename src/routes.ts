import { UserController } from "./controller/UserController";
// import { GameController } from "./controller/GameController";


export const Routes = [
  ///user
  {
    method: "post",
    route: "/gUSER",
    controller: UserController,
    action: "gUSER"
  },
  {
    method: "post",
    route: "/gPROFILE",
    controller: UserController,
    action: "gPROFILE"
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "LOGIN"
  },
  {
    method: "post",
    route: "/loginComplete",
    controller: UserController,
    action: "LOGINCOMPLETE"
  },
  {
    method: "post",
    route: "/challenge",
    controller: UserController,
    action: "CHALLENGE"
  },
  {
    method: "post",
    route: "/avatar",
    controller: UserController,
    action: "AVATAR"
  },
  {
    method: "post",
    route: "/profile/edit",
    controller: UserController,
    action: "PROFILEEDIT"
  },
  {
    method: "post",
    route: "/chat",
    controller: UserController,
    action: "CHAT"
  },
  {
    method: "post",
    route: "/gchat",
    controller: UserController,
    action: "gCHAT"
  },
  {
    method: "post",
    route: "/gGAME",
    controller: UserController,
    action: "gGAME"
  },
  {
    method: "post",
    route: "/cancel",
    controller: UserController,
    action: "CANCEL"
  },
  {
    method: "post",
    route: "/accept",
    controller: UserController,
    action: "ACCEPT"
  },
  {
    method: "post",
    route: "/score",
    controller: UserController,
    action: "SCORE"
  },
  {
    method: "post",
    route: "/confirm",
    controller: UserController,
    action: "CONFIRM"
  },
  {
    method: "post",
    route: "/dispute",
    controller: UserController,
    action: "DISPUTE"
  },
  {
    method: "post",
    route: "/withdraw",
    controller: UserController,
    action: "WITHDRAW"
  },

];
