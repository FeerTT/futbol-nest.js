import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  dtoToClass<T>(dtoObject: any, classObject: T): T {
    if (dtoObject && typeof dtoObject === 'object') {
      for (const property in dtoObject) {
        try {
          if (
            Object.prototype.hasOwnProperty.call(dtoObject, property) &&
            typeof dtoObject[property] !== 'function'
          ) {
            classObject[property] = dtoObject[property];
          }
        } catch (error) {
          console.error(`Error processing property ${property}:`, error);
        }
      }
    }

    return classObject;
  }
  classToEntity<T>(classInstance: T, entity: any): any {
    const classKeys = Object.keys(classInstance);

    classKeys.forEach((key) => {
      if (typeof classInstance[key] !== 'function') {
        entity[key] = classInstance[key];
      }
    });

    return entity;
  }

  entityToClass<T>(entityObject: any, classObject: T): T {
    for (const property in entityObject) {
      if (
        entityObject.hasOwnProperty(property) &&
        typeof entityObject[property] !== 'function'
      ) {
        classObject[property] = entityObject[property];
      }
    }

    return classObject;
  }
}
