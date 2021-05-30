# NgxIdleTimeout

A Self-contained, timeout that provides integrated countdown timer for angular applications

## Dependencies

 * Angular 11+

## Installation

To add idle-timeout to your Angular project:
```
npm i ngx-idle-timeout
```

Once installed, add the slider to your `app.module.ts`:
```typescript
import { NgxIdleTimeoutModule } from 'ngx-idle-timeout';

...

@NgModule({
   ...
   imports: [
     ...
     NgxIdleTimeoutModule,
    ...
   ],
   ...
})
export class AppModule {}
```

## Sample usage

Now you can use the idle-timeout component in your app components, for example in `app.component.ts`:
```typescript
import { IdleService, IdleWarningStates } from 'node_modules/ngx-idle-timeout';
...

@Component({...})
export class AppComponent {
  title = 'test-area';
  idleTimer = true;

  constructor(private _idleService: IdleService) { }

  ngOnInit(): void {
    this.timerSubscribe();
  }

  resubscribe(): void {
    this.idleTimer = true;
    this.timerSubscribe();
  }

  private timerSubscribe(): void {
    this._idleService
      .idleStateChanged()
      .subscribe(
        val => {
          if (val === IdleWarningStates.SecondaryTimerExpired) {
            this._idleService.stopTimer();
            this.idleTimer = false;
          }
        }
      );
  }
}
```

And in template file `app.component.html`:
```html
<ngx-idle-timeout *ngIf="idleTimer"
                 [allowedIdleTimeInSeconds]="120" 
                 [message]="'This is a test message'"
                 [warningTimeInSeconds]="10"></ngx-idle-timeout>
```

## IdleWarningStates 

In addition IdleWarningStates.SecondaryTimerExpired you can also watch for any of the following

```enums
PrimaryTimerStarted
PrimaryTimerExpired
SecondaryTimerStarted
SecondaryTimerExpired
SecondaryTimerCancelled
```

# Default values

All ngx-idle-timeout parameters are optional. When no value is provided then the default values will be used:

```
allowedIdleTimeInSeconds = 60;
warningTimeInSeconds = 10;
message = '';
```

## Known Issues

Before reporting a new bug, please look at [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for a list of known problems and their workarounds. New bugs reports for these problems will not be accepted.

## Bugs

You can report any bugs as [Github issues](https://github.com/NgxIdleTimeout/issues).

Please describe the issue in detail pasting any relevant code, or preferrably a StackBlitz with reproduction of the problem. Please also provide the version of NPM package you are using.

## Changelog

For list of changes and bugfixes, see [CHANGELOG.md](CHANGELOG.md).