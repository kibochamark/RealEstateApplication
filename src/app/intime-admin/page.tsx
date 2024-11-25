import { PropertyPieChart } from "@/components/admin/PropertyPieDistribution"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { PropertyCard } from "@/components/property-card"
// import { BlogPost } from "@/components/blog-post"
// import { Testimonial } from "@/components/testimonial"
// import { PropertyPieChart } from "@/components/property-pie-chart"
// import { QuickPropertySearch } from "@/components/quick-property-search"

export default function DashboardPage() {
  return (
    <div className="space-y-6 col-span-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        {/* <QuickPropertySearch /> */}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary300">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties for Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary300">789</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties for Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary300">445</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary300">56</div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}

