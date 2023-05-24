@Important
public class User {
    private int id;
    @ImportantString
    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Execute
    public void show() {
        System.out.println("Inside Show");
    }

    @Execute(times = 3)
    public void shout() {
        System.out.println("Inside Shout");
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Built-In Annotation Indicating
    // The Method is Overriding Parents Method
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
