"use client";
import { deleteResource } from "@/app/actions/resource-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DocumentDeleteModal({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteResource(id);

      if (!response.success) {
        throw new Error("Failed to delete document");
      }
      router.refresh();
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Trash className="w-4 h-4 mr-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
