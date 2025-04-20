"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, PlusCircle, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Sample categories data
const categories = [
  {
    id: 1,
    name: "Clubs",
    slug: "clubs",
    description: "Golf clubs including drivers, irons, wedges, and putters",
    productCount: 24,
    active: true,
    subcategories: [
      { id: 101, name: "Drivers", slug: "drivers", productCount: 8, active: true },
      { id: 102, name: "Irons", slug: "irons", productCount: 6, active: true },
      { id: 103, name: "Wedges", slug: "wedges", productCount: 5, active: true },
      { id: 104, name: "Putters", slug: "putters", productCount: 5, active: true },
    ],
  },
  {
    id: 2,
    name: "Balls",
    slug: "balls",
    description: "Golf balls from top brands",
    productCount: 12,
    active: true,
    subcategories: [],
  },
  {
    id: 3,
    name: "Shoes",
    slug: "shoes",
    description: "Golf shoes for men and women",
    productCount: 15,
    active: true,
    subcategories: [],
  },
  {
    id: 4,
    name: "Apparels",
    slug: "apparels",
    description: "Golf clothing including shirts, pants, and outerwear",
    productCount: 30,
    active: true,
    subcategories: [
      { id: 401, name: "Shirts", slug: "shirts", productCount: 12, active: true },
      { id: 402, name: "Pants", slug: "pants", productCount: 8, active: true },
      { id: 403, name: "Outerwear", slug: "outerwear", productCount: 10, active: true },
    ],
  },
  {
    id: 5,
    name: "Bags",
    slug: "bags",
    description: "Golf bags including stand bags, cart bags, and travel bags",
    productCount: 8,
    active: true,
    subcategories: [],
  },
  {
    id: 6,
    name: "Grips",
    slug: "grips",
    description: "Golf grips for clubs",
    productCount: 6,
    active: true,
    subcategories: [],
  },
  {
    id: 7,
    name: "Trolleys",
    slug: "trolleys",
    description: "Golf trolleys and carts",
    productCount: 4,
    active: true,
    subcategories: [],
  },
  {
    id: 8,
    name: "Training",
    slug: "training",
    description: "Golf training aids and equipment",
    productCount: 10,
    active: true,
    subcategories: [],
  },
  {
    id: 9,
    name: "Accessories",
    slug: "accessories",
    description: "Golf accessories including gloves, tees, and more",
    productCount: 20,
    active: true,
    subcategories: [
      { id: 901, name: "Gloves", slug: "gloves", productCount: 8, active: true },
      { id: 902, name: "Tees", slug: "tees", productCount: 5, active: true },
      { id: 903, name: "Towels", slug: "towels", productCount: 3, active: true },
      { id: 904, name: "Umbrellas", slug: "umbrellas", productCount: 4, active: true },
    ],
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [isSubcategory, setIsSubcategory] = useState(false)
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null)

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.subcategories.some((sub) => sub.name.toLowerCase().includes(query))
      )
    }
    return true
  })

  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const confirmDelete = (id: number) => {
    setCategoryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const deleteCategory = () => {
    if (categoryToDelete) {
      // In a real app, this would delete the category from the database
      alert(`Category with ID ${categoryToDelete} deleted`)
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    }
  }

  const openAddCategoryDialog = (isSubcat = false, parentId: number | null = null) => {
    setIsSubcategory(isSubcat)
    setParentCategoryId(parentId)
    setCurrentCategory(null)
    setAddCategoryDialogOpen(true)
  }

  const openEditCategoryDialog = (category: any, isSubcat = false, parentId: number | null = null) => {
    setCurrentCategory(category)
    setIsSubcategory(isSubcat)
    setParentCategoryId(parentId)
    setEditCategoryDialogOpen(true)
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would add the category to the database
    alert("Category added successfully")
    setAddCategoryDialogOpen(false)
  }

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the category in the database
    alert("Category updated successfully")
    setEditCategoryDialogOpen(false)
  }

  const toggleCategoryStatus = (id: number) => {
    // In a real app, this would update the category status in the database
    alert(`Category with ID ${id} status toggled`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight dark:text-gray-200">Categories</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          onClick={() => openAddCategoryDialog()}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Category Management</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your product categories and subcategories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Products</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <>
                      <TableRow
                        key={category.id}
                        className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700"
                      >
                        <TableCell className="font-medium dark:text-gray-300">
                          <div className="flex items-center">
                            {category.subcategories.length > 0 ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 mr-2"
                                onClick={() => toggleCategoryExpansion(category.id)}
                              >
                                {expandedCategories.includes(category.id) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            ) : (
                              <div className="w-6 mr-2" />
                            )}
                            {category.name}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate dark:text-gray-400">
                          <span title={category.description}>{category.description}</span>
                        </TableCell>
                        <TableCell className="text-center dark:text-gray-300">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/30">
                            {category.productCount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch checked={category.active} onCheckedChange={() => toggleCategoryStatus(category.id)} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => openEditCategoryDialog(category)}
                            >
                              <Edit className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => confirmDelete(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={() => openEditCategoryDialog(category)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Category
                                </DropdownMenuItem>
                                {category.subcategories.length === 0 && (
                                  <DropdownMenuItem
                                    className="dark:text-gray-300 dark:focus:bg-gray-700"
                                    onClick={() => openAddCategoryDialog(true, category.id)}
                                  >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Add Subcategory
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-gray-700"
                                  onClick={() => confirmDelete(category.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Category
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCategories.includes(category.id) &&
                        category.subcategories.map((subcategory) => (
                          <TableRow
                            key={subcategory.id}
                            className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700"
                          >
                            <TableCell className="font-medium dark:text-gray-300">
                              <div className="flex items-center">
                                <div className="w-6 mr-2" />
                                <div className="border-l-2 border-gray-300 dark:border-gray-600 h-6 mr-2" />
                                {subcategory.name}
                              </div>
                            </TableCell>
                            <TableCell className="dark:text-gray-400">Subcategory of {category.name}</TableCell>
                            <TableCell className="text-center dark:text-gray-300">
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/30">
                                {subcategory.productCount}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={subcategory.active}
                                onCheckedChange={() => toggleCategoryStatus(subcategory.id)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => openEditCategoryDialog(subcategory, true, category.id)}
                                >
                                  <Edit className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => confirmDelete(subcategory.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-gray-200">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be undone. This will permanently delete the category and all its subcategories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteCategory}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryDialogOpen} onOpenChange={setAddCategoryDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-200">
              {isSubcategory ? "Add Subcategory" : "Add Category"}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {isSubcategory
                ? "Add a new subcategory to an existing category."
                : "Add a new category to organize your products."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCategory}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug" className="dark:text-gray-300">
                  Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="Enter category slug"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  The slug is used in the URL. Use lowercase letters, numbers, and hyphens only.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="dark:text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter category description"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active" className="dark:text-gray-300">
                  Active (visible in store)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddCategoryDialogOpen(false)}
                className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={editCategoryDialogOpen} onOpenChange={setEditCategoryDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-200">
              {isSubcategory ? "Edit Subcategory" : "Edit Category"}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Make changes to the category information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCategory}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  defaultValue={currentCategory?.name}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug" className="dark:text-gray-300">
                  Slug
                </Label>
                <Input
                  id="edit-slug"
                  defaultValue={currentCategory?.slug}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  The slug is used in the URL. Use lowercase letters, numbers, and hyphens only.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="dark:text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  defaultValue={currentCategory?.description}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="edit-active" defaultChecked={currentCategory?.active} />
                <Label htmlFor="edit-active" className="dark:text-gray-300">
                  Active (visible in store)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditCategoryDialogOpen(false)}
                className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
