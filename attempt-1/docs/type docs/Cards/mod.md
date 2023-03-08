<span style="color:red"><strong>INTERNAL_TYPE</strong></span> *declaration*
```ts
interface mod {
    id: string;
    type: moderationType;
    moderator: moderatorAccounts;
    target: string;
    reason: string;
    createdAt: number;
    automated: boolean;
}
```

#### <span style="color:yellow">string</span> id
The id of the moderation. Must follow the format: USERID-TIMESTAMP
#### <span style="color:yellow">moderationType</span> type
The type of the modertion, eg "warning"
#### <span style="color:yellow">moderatorAccounts</span> moderator
The id of the account that added the moderation or AUTO for an automod violation.
#### <span style="color:yellow">string</span> target
The id of the user that the punishment has been logged against. This may be inluded in the ID but its also added here for filtering purposes and for better database management. Allows typesafe work.
#### <span style="color:yellow">string</span> reason
The reason the moderation was given to the user. Provided when the moderation is created. for automated requests this just gives the rule that was broken, for manual requests the reason must be given by the moderator who logged the punishment
#### <span style="color:yellow">number</span> createdAt
The timestamp of when the moderation was created. Must be set to the exact same number as inside of the id.
#### <span style="color:yellow">boolean</span> automated
Was the moderation created by automod or by a useer