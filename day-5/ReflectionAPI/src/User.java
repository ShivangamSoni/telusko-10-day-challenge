public class User {
    private int id;
    private String name;

    public User() {
    }

    public User(int id, String name) {
        System.out.println("Object Created");
        this.id = id;
        this.name = name;
    }

    private String getDetails() {
        return "Hello, I'm User: " + name + "! ID: " + id;
    }

    private String getPrivateDetails(int i, String s) {
        return "Here's what I received: " + i + " " + s;
    }
}
