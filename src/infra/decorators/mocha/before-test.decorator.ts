import {ReflectionTypes} from "../../models/mocha";

export function BeforeTest() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const fields: unknown[] = Reflect.getMetadata(ReflectionTypes.BeforeTest, target) || [];
    fields.push({
      name: propertyKey
    });

    Reflect.defineMetadata(ReflectionTypes.BeforeTest, fields, target);

    const oldExecutable = descriptor.value;
    return {
      ...descriptor,
      value (...args: unknown[]) {
        return oldExecutable.apply(target, args);
      }
    };
  }
}
