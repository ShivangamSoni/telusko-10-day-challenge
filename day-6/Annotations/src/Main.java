import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) {
        User u1 = new User(1, "Shivi");
        System.out.println(u1 + "\n");

        // Adding functionality for Annotation on Run-Time using Reflection
        Class<?> cls = u1.getClass();
        if(cls.isAnnotationPresent(Important.class)) {
            System.out.println(cls.getName() + " is an Important Class\n");

            for(Method m : cls.getDeclaredMethods()) {
                if(m.isAnnotationPresent(Execute.class)) {
                    Annotation an = m.getAnnotation(Execute.class);
                    Execute exAn = (Execute) an;
                    int times = exAn.times();
                    System.out.println("Executing Method: " + m.getName() + " " + times + " Time(s)");
                    for(int i = 1; i <= times; i++) {
                        try {
                            m.invoke(u1);
                        } catch (IllegalAccessException | InvocationTargetException e) {
                            e.printStackTrace();
                        }
                    }
                    System.out.println();
                }
            }

            for(Field f : cls.getDeclaredFields()) {
                if(f.isAnnotationPresent(ImportantString.class) && f.getType().equals(String.class)) {
                    System.out.println(f.getName() + " is an Important String");
                    if(!f.canAccess(u1)) {
                        f.setAccessible(true);
                    }
                    try {
                        System.out.println(f.getName() + " : " + f.get(u1));
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
