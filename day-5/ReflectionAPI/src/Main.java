import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class Main {
    public static void main(String[] args) {
        System.out.println("Reflection API\n");

        Class<?> reflectClass = User.class;
        System.out.println("Class Name: " + reflectClass.getName() + "\n");

        int classModifier = reflectClass.getModifiers();
        System.out.println("Modifier Constant: " + classModifier);
        System.out.println("Modifier: " + Modifier.toString(classModifier) + "\n");

        Class<?> superClass = reflectClass.getSuperclass();
        System.out.println("Super Class: " + superClass.getName() + "\n");

        Method[] publicMethods = reflectClass.getDeclaredMethods();
        for (Method m: publicMethods) {
            String name = m.getName();
            String identity = "Method";
            if(name.startsWith("get")) {
                identity = "Getter";
            } else if(name.startsWith("set")) {
                identity = "Setter";
            }
            System.out.println(identity + ": " + name + " | Returns: " + m.getReturnType().getName());

            Class<?>[] parameterTypes = m.getParameterTypes();
            System.out.println("Parameters:");
            for(Class<?> p : parameterTypes) {
                System.out.println(p.getName());
            }
            System.out.println("\n");
        }

        try {
            // Creating an Instance
            Constructor<?> constructor = reflectClass.getDeclaredConstructor();
            User userInstance = (User) constructor.newInstance();
            System.out.println(userInstance);

            // Invoking Private Method
            Method getDetails = reflectClass.getDeclaredMethod("getDetails");
            getDetails.setAccessible(true);
            String res = (String) getDetails.invoke(userInstance);
            System.out.println(res);

            // Invoking Private Method with Arguments
            Method getPrivateDetails = reflectClass.getDeclaredMethod("getPrivateDetails", int.class, String.class);
            getPrivateDetails.setAccessible(true);
            res = (String) getPrivateDetails.invoke(userInstance, 23, "Test");
            System.out.println(res);
        } catch (NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
