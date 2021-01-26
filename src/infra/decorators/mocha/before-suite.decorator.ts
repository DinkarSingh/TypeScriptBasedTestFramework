import {ReflectionTypes} from "../../models/mocha";

export function BeforeSuite() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const fields: unknown[] = Reflect.getMetadata(ReflectionTypes.BeforeSuite, target) || [];
    fields.push({
      name: propertyKey
    });

    Reflect.defineMetadata(ReflectionTypes.BeforeSuite, fields, target);

    const oldExecutable = descriptor.value;
    return {
      ...descriptor,
      value (...args: unknown[]) {
        return oldExecutable.apply(target, args);
      }
    };
  }
}
