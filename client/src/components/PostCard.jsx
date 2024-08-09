import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/ ";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
const PostCard = (post) => {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <AvatarImage src={post.user.profilePic} alt={post.user.names} />
          <AvatarFallback>{post.user.name}</AvatarFallback>
        </Avatar>
        <span>{post.user.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full"
            >
              <MoveHorizontalIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span class="material-symbols-outlined">bookmark</span> Guardar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span class="material-symbols-outlined">link</span> Copiar enlace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        {post.attatchment.lenght !== 0 &&
          (post.attatchment.type === "image" ? (
            <img src={post.attatchment.url} alt={post.attatchment.alt} />
          ) : (
            <video src={post.attatchment.url} />
          ))}
      </CardContent>
      <CardFooter></CardFooter>
      <Button variant="ghost">
        <span class="material-symbols-outlined">thumb_up</span> {post.likes}
      </Button>
      <Button variant="ghost">
        <span class="material-symbols-outlined">chat_bubble</span>{" "}
        {post.comments}
      </Button>
      <Button variant="ghost">
        <span class="material-symbols-outlined">repeat</span>{" "}
      </Button>
    </Card>
  );
};

export default PostCard;
