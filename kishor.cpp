#include <iostream>
#include <vector>
using namespace std;

class Course;

class Student
{
public:
  int id;
  string name;
  vector<Course *> enrolledCourses;

  Student(int i, string n)
  {
    id = i;
    name = n;
  }

  void enrollCourse(Course *course);
};

class Course
{
public:
  int courseId;
  string title;
  int credits;

  Course(int cid, string t, int c)
  {
    courseId = cid;
    title = t;
    credits = c;
  }
};

void Student::enrollCourse(Course *course)
{
  enrolledCourses.push_back(course);
}

void studentsWithMoreThan2Courses(vector<Student *> &students)
{
  cout << "\nStudents enrolled in more than 2 courses:\n";
  for (auto s : students)
  {
    if (s->enrolledCourses.size() > 2)
    {
      cout << s->name << endl;
    }
  }
}

// Retrieve courses of "Amit"
void coursesOfAmit(vector<Student *> &students)
{
  cout << "\nCourses of Amit:\n";
  for (auto s : students)
  {
    if (s->name == "Amit")
    {
      for (auto c : s->enrolledCourses)
      {
        cout << c->courseId << " - "
             << c->title << " ("
             << c->credits << " credits)\n";
      }
      return;
    }
  }
  cout << "Amit not found.\n";
}

// -------------------- Main --------------------
int main()
{
  // Create Courses
  Course c1(101, "Math", 4);
  Course c2(102, "Physics", 3);
  Course c3(103, "Chemistry", 3);
  Course c4(104, "Biology", 2);

  // Create Students
  Student s1(1, "Amit");
  Student s2(2, "Rahul");
  Student s3(3, "Sneha");

  // Enroll Students
  s1.enrollCourse(&c1);
  s1.enrollCourse(&c2);
  s1.enrollCourse(&c3); // Amit has 3 courses

  s2.enrollCourse(&c1);
  s2.enrollCourse(&c2);

  s3.enrollCourse(&c1);
  s3.enrollCourse(&c2);
  s3.enrollCourse(&c3);
  s3.enrollCourse(&c4); // Sneha has 4 courses

  // Store all students
  vector<Student *> students = {&s1, &s2, &s3};

  // Task 2
  studentsWithMoreThan2Courses(students);

  // Task 3
  coursesOfAmit(students);

  return 0;
}
