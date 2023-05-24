public class Main {
    public static void main(String[] args) {
        User u1 = new User(1, "Shivi");
        System.out.println(u1 + "\n");

        // Adding functionality for Annotation on Run-Time using Reflection
        Class<?> cls = u1.getClass();
        if(cls.isAnnotationPresent(Important.class)) {
            System.out.println(cls.getName() + " is an Important Class");
        }
    }
}
