*declaration*
```ts
export interface ban extends mod {
	type: "ban";
	isPermanant: boolean;
	endedAt?: number;
	duration: number;
}
```

#### <span style="color:yellow">boolean</span> isPermanant
If the ban was a permanant ban or a temprary ban.
#### <span style="color:yellow">number</span> duration
The amount of time that the ban lasted.
#### <span style="color:yellow">number | undefined</span> endedAt
The timestamp of when the ban ended/ends. This could be calculated later however its just faster/easier to have a single value to read for the ended at time too. If the ban does not have an end date then this value will be set to undefined.