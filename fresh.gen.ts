// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_middleware.ts";
import * as $3 from "./routes/api/chat/_middleware.ts";
import * as $4 from "./routes/api/chat/connect.ts";
import * as $5 from "./routes/api/chat/create-room.ts";
import * as $6 from "./routes/api/chat/send.ts";
import * as $7 from "./routes/api/get-cities.ts";
import * as $8 from "./routes/api/get-profiles.ts";
import * as $9 from "./routes/api/get-user.ts";
import * as $10 from "./routes/api/joke.ts";
import * as $11 from "./routes/auth/login/[provider].tsx";
import * as $12 from "./routes/auth/login/_middleware.ts";
import * as $13 from "./routes/auth/login/index.tsx";
import * as $14 from "./routes/auth/signup.tsx";
import * as $15 from "./routes/auth/verify.tsx";
import * as $16 from "./routes/chat/[room_code].tsx";
import * as $17 from "./routes/chat/_middleware.ts";
import * as $18 from "./routes/chat/index.tsx";
import * as $19 from "./routes/error.tsx";
import * as $20 from "./routes/find-partner/[criteria].tsx";
import * as $21 from "./routes/index.tsx";
import * as $22 from "./routes/logout.tsx";
import * as $23 from "./routes/profile/[id].tsx";
import * as $24 from "./routes/profile/setting.tsx";
import * as $$0 from "./islands/AddRoom.tsx";
import * as $$1 from "./islands/Carousel.tsx";
import * as $$2 from "./islands/Chat.tsx";
import * as $$3 from "./islands/LoginForm.tsx";
import * as $$4 from "./islands/Nav.tsx";
import * as $$5 from "./islands/Pagination.tsx";
import * as $$6 from "./islands/PrimaryProfileCard.tsx";
import * as $$7 from "./islands/PrimaryTab.tsx";
import * as $$8 from "./islands/Profile.tsx";
import * as $$9 from "./islands/ProfileSetting.tsx";
import * as $$10 from "./islands/SecondaryProfileCard.tsx";
import * as $$11 from "./islands/SecondaryTab.tsx";
import * as $$12 from "./islands/SignupForm.tsx";
import * as $$13 from "./islands/Verify.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_middleware.ts": $2,
    "./routes/api/chat/_middleware.ts": $3,
    "./routes/api/chat/connect.ts": $4,
    "./routes/api/chat/create-room.ts": $5,
    "./routes/api/chat/send.ts": $6,
    "./routes/api/get-cities.ts": $7,
    "./routes/api/get-profiles.ts": $8,
    "./routes/api/get-user.ts": $9,
    "./routes/api/joke.ts": $10,
    "./routes/auth/login/[provider].tsx": $11,
    "./routes/auth/login/_middleware.ts": $12,
    "./routes/auth/login/index.tsx": $13,
    "./routes/auth/signup.tsx": $14,
    "./routes/auth/verify.tsx": $15,
    "./routes/chat/[room_code].tsx": $16,
    "./routes/chat/_middleware.ts": $17,
    "./routes/chat/index.tsx": $18,
    "./routes/error.tsx": $19,
    "./routes/find-partner/[criteria].tsx": $20,
    "./routes/index.tsx": $21,
    "./routes/logout.tsx": $22,
    "./routes/profile/[id].tsx": $23,
    "./routes/profile/setting.tsx": $24,
  },
  islands: {
    "./islands/AddRoom.tsx": $$0,
    "./islands/Carousel.tsx": $$1,
    "./islands/Chat.tsx": $$2,
    "./islands/LoginForm.tsx": $$3,
    "./islands/Nav.tsx": $$4,
    "./islands/Pagination.tsx": $$5,
    "./islands/PrimaryProfileCard.tsx": $$6,
    "./islands/PrimaryTab.tsx": $$7,
    "./islands/Profile.tsx": $$8,
    "./islands/ProfileSetting.tsx": $$9,
    "./islands/SecondaryProfileCard.tsx": $$10,
    "./islands/SecondaryTab.tsx": $$11,
    "./islands/SignupForm.tsx": $$12,
    "./islands/Verify.tsx": $$13,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
