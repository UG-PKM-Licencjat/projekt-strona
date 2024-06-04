import { Card, CardContent } from "~/components/ui/card";

export default function UserInfoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <img
            src="/placeholder.svg"
            alt="User Profile"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Jane Doe</h1>
          <div className="grid gap-1">
            <p className="text-gray-500 dark:text-gray-400">@janedoe</p>
            <p className="text-gray-500 dark:text-gray-400">
              jane.doe@example.com
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              San Francisco, CA
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Experienced software engineer with a passion for building innovative
            solutions.
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Polubione oferty</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Acme Inc. - San Francisco, CA
                </p>
                <p className="text-sm">
                  We are looking for an experienced frontend developer to join
                  our growing team. You will be responsible for building
                  high-performance, scalable web applications using the latest
                  technologies.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Full-Stack Engineer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Globex Corporation - New York, NY
                </p>
                <p className="text-sm">
                  We are seeking a talented full-stack engineer to join our
                  team. You will be responsible for building and maintaining
                  complex web applications, as well as integrating with various
                  backend services.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Backend Developer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stark Industries - Los Angeles, CA
                </p>
                <p className="text-sm">
                  We are looking for an experienced backend developer to join
                  our team. You will be responsible for designing and
                  implementing scalable and secure backend systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Twoje oferty</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Acme Inc. - San Francisco, CA
                </p>
                <p className="text-sm">
                  We are looking for an experienced frontend developer to join
                  our growing team. You will be responsible for building
                  high-performance, scalable web applications using the latest
                  technologies.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Full-Stack Engineer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Globex Corporation - New York, NY
                </p>
                <p className="text-sm">
                  We are seeking a talented full-stack engineer to join our
                  team. You will be responsible for building and maintaining
                  complex web applications, as well as integrating with various
                  backend services.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Backend Developer</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stark Industries - Los Angeles, CA
                </p>
                <p className="text-sm">
                  We are looking for an experienced backend developer to join
                  our team. You will be responsible for designing and
                  implementing scalable and secure backend systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
