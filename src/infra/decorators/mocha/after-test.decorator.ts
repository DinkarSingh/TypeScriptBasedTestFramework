import {ReflectionTypes} from "../../models/mocha/reflection-types"

export function AfterTest() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const fields: unknown[] = Reflect.getMetadata(ReflectionTypes.AfterTest, target) || [];
    fields.push({
      name: propertyKey
    });

    Reflect.defineMetadata(ReflectionTypes.AfterTest, fields, target);

    const oldExecutable = descriptor.value;
    return {
      ...descriptor,
      value (...args: unknown[]) {
        return oldExecutable.apply(target, args);
      }
    };
  }
}
