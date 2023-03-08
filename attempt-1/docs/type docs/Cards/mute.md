*declaration*
```ts
export interface mute extends mod {
	type: "mute";
	duration: number;
	endedAt: number;
}
```

#### <span style="color:yellow">number</span> duration
The amount of time that the mute lasted.
#### <span style="color:yellow">number</span> endedAt
The timestamp of when the mute ended/ends. This could be calculated later however its just faster/easier to have a single value to read for the ended at time too.