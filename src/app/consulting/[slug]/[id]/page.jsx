import PageTagBreadcrumb from "@/components/ui/pageTagBreadcrumb";
import SplitSection from "@/components/splitSection";
import SplitSectionChild from "@/components/splitSectionChild";
import { H2, H3, P } from "@/components/ui/fonts";
import { supabase } from "@/lib/supabaseclient";
import Image from "next/image";
import ProductCardSection from "@/components/productCardSection";

export async function generateMetadata({ params }) {
  const { data, error } = await supabase
    .from("ib-product-cards")
    .select("*")
    .eq("url", params.slug + "/" + params.id);

  if (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Default Title",
      description: "Default description",
    };
  }

  const product = data[0];

  return {
    title: product?.title || "Default Title",
  };
}

export default async function page({ params }) {
  const { data, error } = await supabase
    .from("ib-product-cards")
    .select("*")
    .eq("url", params.slug + "/" + params.id);

  if (error || !data || data.length === 0) {
    // Handle the error case (e.g., return a 404 page or a different component)
    return <div>Error: Data not found</div>;
  }

  const idData = data[0];
  console.log(idData);

  return (
    <>
      <SplitSection>
        <SplitSectionChild img className="order-last">
          <Image
            className="md:w-full md:h-full max-h-[380px] object-cover md:max-h-none"
            src={`/img/ydelse/${idData.icon}.jpg`}
            alt={`${idData.title} billede`}
            width={800}
            height={800}
          />
        </SplitSectionChild>
        <SplitSectionChild>
          <div className="md:min-h-[calc(100vh-79px)] ">
            <PageTagBreadcrumb
              grandParent={"Consulting"}
              grandParentHRef={"/consulting"}
              parent={idData.parent}
              parentHRef={`/consulting/${params.slug}`}
              currentPage={idData.title}
            />
            <H2>{idData.title}</H2>
            <P>{idData.ydelse_content_1}</P>
          </div>

          {idData.ydelse_headline_2 && idData.ydelse_content_2 && (
            <div className="md:min-h-[calc(100vh-79px)] ">
              <H3>{idData.ydelse_headline_2}</H3>
              <P>{idData.ydelse_content_2}</P>
            </div>
          )}
          {idData.ydelse_headline_3 && idData.ydelse_content_3 && (
            <div className="md:min-h-[calc(100vh-79px)] ">
              <H3>{idData.ydelse_headline_3}</H3>
              <P>{idData.ydelse_content_3}</P>
            </div>
          )}
          <div className="pb-8 md:pb-12 pt-[25px] md:pt-[40px] max-w-[1280px] w-full px-2.5 sm:px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
            <H2 className="">Se vores andre ekspertiseområder</H2>
            <ProductCardSection
              slugIcon={idData.icon}
              parentCategory={idData.parent}
            />
          </div>
        </SplitSectionChild>
      </SplitSection>
    </>
  );
}
