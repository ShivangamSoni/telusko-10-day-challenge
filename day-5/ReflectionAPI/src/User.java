public final class User {
    private int id;
    private String name;

    public User() {
        System.out.println("Object Created");
    }

    private String getDetails() {
        return "Hello, I'm User: " + name + "! ID: " + id;
    }

    private String getPrivateDetails(int i, String s) {
        return "Here's what I received: " + i + " " + s;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
