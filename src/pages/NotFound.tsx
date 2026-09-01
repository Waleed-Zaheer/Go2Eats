import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CompassIcon />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>The page you're looking for doesn't exist or has moved.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link to="/">Back to GotoEats</Link>} />
        </EmptyContent>
      </Empty>
    </div>
  );
}
