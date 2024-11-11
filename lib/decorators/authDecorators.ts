import { checkActionneur, checkAuth } from "@lib/services/auth";

export const requireAuth = (
    _: unknown,
    __: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
        await checkAuth();
        return originalMethod.apply(this, args);
    };

    return descriptor;
};

export const requireActionneur = (
    _: unknown,
    __: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
        await checkAuth();
        await checkActionneur(false);
        return originalMethod.apply(this, args);
    };

    return descriptor;
};

export const requireAdmin = (
    _: unknown,
    __: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
        await checkAuth();
        await checkActionneur(true);
        return originalMethod.apply(this, args);
    };

    return descriptor;
};
