import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-4 md:p-8 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription className="text-foreground/80">
            This section is for administrators only.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            The admin login functionality is currently under development and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
