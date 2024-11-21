import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DEBOUNCE_TIME_CLICK } from '@shared/constants/other.constants';

enum EventTypesEnum {
  SINGLE_CLICK = 'click',
  DOUBLE_CLICK = 'dblclick'
}

@Directive({
  selector: '[click.single],[click.double]'
})
export class ClickDoubleDirective implements OnInit, OnDestroy {
  @Input() public debounceTime = DEBOUNCE_TIME_CLICK;
  @Output('click.double') doubleClick = new EventEmitter();
  @Output('click.single') singleClick = new EventEmitter();

  private readonly clicksSubject = new Subject<MouseEvent>();
  private subscription$ = new Subscription();

  public ngOnInit(): void {
    this.subscription$ = this.clicksSubject
      .pipe(debounceTime(this.debounceTime))
      .subscribe(event => {
        if (event.type === EventTypesEnum.SINGLE_CLICK) {
          this.singleClick.emit(event);
        } else {
          this.doubleClick.emit(event);
        }
      });
  }
/*
  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicksSubject.next(event);
  }

  @HostListener('dblclick', ['$event'])
  doubleClickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.singleClick?.observed) {
      event = {
        ...event,
        type: EventTypesEnum.SINGLE_CLICK
      };
    }
    this.clicksSubject.next(event);
  }
*/
  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
