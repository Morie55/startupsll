"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Download } from "lucide-react";
import { UploadForm } from "./Uploader";
import { DocumentDeleteModal } from "./DocumentDeleteModal";
import { formatDate } from "@/lib/formatDate";

// import { UploadForm } from "@/components/upload-form";

interface Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string;
  date: string;
}

export default function DownloadsPage({
  documents,
}: {
  documents?: Document[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  //   const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS); // In a real app, this would be fetched from a backend

  // Extract unique categories from documents for the filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set(documents?.map((doc) => doc.category));
    return ["all", ...Array.from(uniqueCategories).sort()];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents?.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, selectedCategory]);

  // Function to simulate adding a new document after upload
  // const handleNewDocumentUpload = (
  //   newDoc: Omit<Document, "id" | "uploadedAt"> & {
  //     fileUrl: string;
  //     fileType: string;
  //   }
  // ) => {
  //   const newId = (documents.length + 1).toString(); // Simple ID generation
  //   const uploadedAt = new Date().toISOString();
  //   setDocuments((prevDocs) => [
  //     {
  //       ...newDoc,
  //       id: newId,
  //       uploadedAt,
  //       fileUrl: newDoc.fileUrl,
  //       fileType: newDoc.fileType,
  //     },
  //     ...prevDocs, // Add new document to the top
  //   ]);
  // };

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-center">
        Document Management
      </h1>

      <div className="grid-cols-1 gap-8 grid1 lg:grid-cols-3">
        {/* Upload New Document Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadForm />
          </CardContent>
        </Card>

        {/* Documents Table Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Available Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pr-4 pl-9"
                  aria-label="Search documents by title or description"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[120px]">Category</TableHead>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead className="w-[150px]">Uploaded At</TableHead>
                    <TableHead className="text-right w-[80px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments?.length! > 0 ? (
                    filteredDocuments?.map((doc) => (
                      <TableRow key={doc._id}>
                        <TableCell className="font-medium">
                          {doc.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm line-clamp-2 max-w-[300px]">
                          {doc.description}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            {doc.fileType}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(doc.date)}
                          {/* {new Date(doc.date).toLocaleDateString()} */}
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-2 text-right">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                            title={`Download ${doc.title}`}
                          >
                            <Download className="w-4 h-4" />
                            <span className="sr-only">Download</span>
                          </a>

                          <DocumentDeleteModal id={doc._id} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No documents found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
