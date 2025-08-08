"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  CalendarIcon, 
  Building,
  Calculator,
  FileText,
  MapPin,
  Truck,
  Monitor,
  Wrench,
  BookOpen
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface FixedAssetsFormProps {
  open: boolean
  onClose: () => void
}

export function FixedAssetsForm({ open, onClose }: FixedAssetsFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [assetName, setAssetName] = useState("")
  const [assetCategory, setAssetCategory] = useState("")
  const [assetType, setAssetType] = useState("")
  const [description, setDescription] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [model, setModel] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [purchaseDate, setPurchaseDate] = useState<Date>()
  const [purchasePrice, setPurchasePrice] = useState("")
  const [vendor, setVendor] = useState("")
  const [warrantyPeriod, setWarrantyPeriod] = useState("")
  const [warrantyExpiry, setWarrantyExpiry] = useState<Date>()
  const [location, setLocation] = useState("")
  const [department, setDepartment] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [condition, setCondition] = useState("")
  const [depreciationMethod, setDepreciationMethod] = useState("")
  const [usefulLife, setUsefulLife] = useState("")
  const [salvageValue, setSalvageValue] = useState("")
  const [notes, setNotes] = useState("")

  const assetCategories = [
    { value: "building", label: "Buildings & Structures", icon: Building },
    { value: "equipment", label: "Equipment & Machinery", icon: Wrench },
    { value: "it", label: "IT & Technology", icon: Monitor },
    { value: "vehicle", label: "Vehicles & Transportation", icon: Truck },
    { value: "furniture", label: "Furniture & Fixtures", icon: BookOpen },
    { value: "other", label: "Other Assets", icon: FileText }
  ]

  const assetTypes = {
    building: ["Office Building", "Laboratory", "Warehouse", "Parking Structure", "Dormitory"],
    equipment: ["Laboratory Equipment", "Manufacturing Equipment", "Medical Equipment", "Research Equipment"],
    it: ["Computers", "Servers", "Network Equipment", "Software Licenses", "Audio/Visual Equipment"],
    vehicle: ["Cars", "Trucks", "Buses", "Maintenance Vehicles", "Emergency Vehicles"],
    furniture: ["Desks", "Chairs", "Tables", "Cabinets", "Shelving"],
    other: ["Art & Collectibles", "Security Equipment", "Tools", "Miscellaneous"]
  }

  const depreciationMethods = [
    "Straight Line",
    "Declining Balance",
    "Sum of Years Digits",
    "Units of Production",
    "No Depreciation"
  ]

  const conditions = [
    { value: "excellent", label: "Excellent", color: "text-green-600" },
    { value: "good", label: "Good", color: "text-blue-600" },
    { value: "fair", label: "Fair", color: "text-yellow-600" },
    { value: "poor", label: "Poor", color: "text-orange-600" },
    { value: "needs-repair", label: "Needs Repair", color: "text-red-600" }
  ]

  const calculateDepreciation = () => {
    if (!purchasePrice || !usefulLife || !depreciationMethod) return null
    
    const cost = parseFloat(purchasePrice)
    const salvage = parseFloat(salvageValue) || 0
    const life = parseFloat(usefulLife)
    
    if (depreciationMethod === "Straight Line") {
      const annualDepreciation = (cost - salvage) / life
      return {
        annual: annualDepreciation,
        monthly: annualDepreciation / 12,
        total: cost - salvage
      }
    }
    return null
  }

  const depreciation = calculateDepreciation()

  const handleSubmit = () => {
    const assetData = {
      assetName,
      assetCategory,
      assetType,
      description,
      serialNumber,
      model,
      manufacturer,
      purchaseDate,
      purchasePrice: parseFloat(purchasePrice),
      vendor,
      warrantyPeriod,
      warrantyExpiry,
      location,
      department,
      assignedTo,
      condition,
      depreciationMethod,
      usefulLife: parseFloat(usefulLife),
      salvageValue: parseFloat(salvageValue) || 0,
      notes,
      depreciation
    }
    console.log("Fixed Asset data:", assetData)
    onClose()
  }

  const handleReset = () => {
    setAssetName("")
    setAssetCategory("")
    setAssetType("")
    setDescription("")
    setSerialNumber("")
    setModel("")
    setManufacturer("")
    setPurchaseDate(undefined)
    setPurchasePrice("")
    setVendor("")
    setWarrantyPeriod("")
    setWarrantyExpiry(undefined)
    setLocation("")
    setDepartment("")
    setAssignedTo("")
    setCondition("")
    setDepreciationMethod("")
    setUsefulLife("")
    setSalvageValue("")
    setNotes("")
  }

  const selectedCategory = assetCategories.find(cat => cat.value === assetCategory)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Add Fixed Asset
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="location">Location & Assignment</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Asset Information
                </CardTitle>
                <CardDescription>Enter basic asset details and specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetName">Asset Name *</Label>
                    <Input
                      id="assetName"
                      placeholder="Enter asset name"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetCategory">Asset Category *</Label>
                    <Select value={assetCategory} onValueChange={setAssetCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {assetCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <category.icon className="h-4 w-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {assetCategory && (
                  <div className="space-y-2">
                    <Label htmlFor="assetType">Asset Type *</Label>
                    <Select value={assetType} onValueChange={setAssetType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assetTypes[assetCategory as keyof typeof assetTypes]?.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the asset..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      placeholder="Manufacturer name"
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="Model number/name"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input
                      id="serialNumber"
                      placeholder="Serial/ID number"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("financial")}>
                Next: Financial Information
              </Button>
            </div>
          </TabsContent>

          {/* Financial Information Tab */}
          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Purchase & Financial Information
                </CardTitle>
                <CardDescription>Enter purchase details and depreciation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Purchase Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !purchaseDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {purchaseDate ? format(purchaseDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={purchaseDate}
                          onSelect={setPurchaseDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price *</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor/Supplier</Label>
                    <Input
                      id="vendor"
                      placeholder="Vendor name"
                      value={vendor}
                      onChange={(e) => setVendor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="warrantyPeriod">Warranty Period</Label>
                    <Input
                      id="warrantyPeriod"
                      placeholder="e.g., 2 years, 36 months"
                      value={warrantyPeriod}
                      onChange={(e) => setWarrantyPeriod(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Warranty Expiry</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !warrantyExpiry && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {warrantyExpiry ? format(warrantyExpiry, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={warrantyExpiry}
                          onSelect={setWarrantyExpiry}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Depreciation Settings</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="depreciationMethod">Depreciation Method</Label>
                      <Select value={depreciationMethod} onValueChange={setDepreciationMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {depreciationMethods.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usefulLife">Useful Life (Years)</Label>
                      <Input
                        id="usefulLife"
                        type="number"
                        min="1"
                        placeholder="Years"
                        value={usefulLife}
                        onChange={(e) => setUsefulLife(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salvageValue">Salvage Value</Label>
                      <Input
                        id="salvageValue"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={salvageValue}
                        onChange={(e) => setSalvageValue(e.target.value)}
                      />
                    </div>
                  </div>

                  {depreciation && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Depreciation Calculation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold">${depreciation.annual.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">Annual</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">${depreciation.monthly.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">Monthly</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">${depreciation.total.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">Total Depreciable</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("location")}>
                Next: Location & Assignment
              </Button>
            </div>
          </TabsContent>

          {/* Location & Assignment Tab */}
          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location & Assignment
                </CardTitle>
                <CardDescription>Specify where the asset is located and who is responsible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Physical Location *</Label>
                    <Input
                      id="location"
                      placeholder="Building, Room, Floor, etc."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Input
                      id="assignedTo"
                      placeholder="Person responsible for the asset"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Current Condition</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond.value} value={cond.value}>
                            <span className={cond.color}>{cond.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about the asset..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("financial")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("review")}>
                Next: Review
              </Button>
            </div>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Asset Summary
                </CardTitle>
                <CardDescription>Review all asset details before submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Asset Name</Label>
                      <div className="text-sm">{assetName || "Not specified"}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <div className="text-sm flex items-center gap-2">
                        {selectedCategory && <selectedCategory.icon className="h-4 w-4" />}
                        {selectedCategory?.label || "Not selected"}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <div className="text-sm">{assetType || "Not specified"}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Manufacturer</Label>
                      <div className="text-sm">{manufacturer || "Not specified"}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Purchase Price</Label>
                      <div className="text-sm">${purchasePrice ? parseFloat(purchasePrice).toLocaleString() : "Not specified"}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Purchase Date</Label>
                      <div className="text-sm">{purchaseDate ? format(purchaseDate, "PPP") : "Not set"}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <div className="text-sm">{location || "Not specified"}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Department</Label>
                      <div className="text-sm">{department || "Not specified"}</div>
                    </div>
                  </div>
                </div>

                {depreciation && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Depreciation Summary</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold">${depreciation.annual.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Annual Depreciation</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{usefulLife} years</div>
                          <div className="text-sm text-muted-foreground">Useful Life</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{depreciationMethod}</div>
                          <div className="text-sm text-muted-foreground">Method</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("location")}>
                Previous
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset Form
                </Button>
                <Button onClick={handleSubmit}>
                  Add Fixed Asset
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
