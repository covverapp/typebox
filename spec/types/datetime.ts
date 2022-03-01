import * as Spec from './spec'
import { Type } from './typebox'

Spec.expectType<Date>(Spec.infer(Type.DateTime()))
