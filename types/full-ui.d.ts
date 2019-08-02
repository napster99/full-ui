/** Searchform Component */ import { ElSearchform } from './searchform';
import { ElTySearchBox } from './ty-search-box'
import { ElTyTable } from './ty-table'
import { ElTyDebounce } from './ty-debounce'
import { ElTyThrottle } from './ty-throttle'

export class Searchform extends ElSearchform {}

/** TySearchBox Component */
export class TySearchBox extends ElTySearchBox {}

/** TyTable Component */
export class TyTable extends ElTyTable {}

/** TyDebounce Component */
export class TyDebounce extends ElTyDebounce {}

/** TyThrottle Component */
export class TyThrottle extends ElTyThrottle {}
