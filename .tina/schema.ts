import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
    },
    {
      label: "Writing",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          name: "body",
          label: "Blog Post Body",
          type: "rich-text",
          isBody: true,
        },
      ],
    },
    {
      label: "Music",
      name: "music",
      path: "content/music",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          name: "audioUrl",
          label: "Audio URL",
          type: "image",
        },
        {
          name: "imageUrl",
          label: "Image URL",
          type: "image",
        },
        {
          name: "body",
          label: "Blog Post Body",
          type: "rich-text",
          isBody: true,
        },
      ],
    },
    {
      label: "Photos",
      name: "photo",
      path: "content/photos",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          name: "photoCollectionUrl",
          label: "Photo Collection URL",
          type: "image",
        },
        {
          name: "body",
          label: "Blog Post Body",
          type: "rich-text",
          isBody: true,
        },
      ],
    },
  ],
});
