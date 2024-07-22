import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-2 lg:col-span-2 mt-auto mb-0 py-6 w-full text-neutral-700 text-xs">
      <div className="flex items-center gap-[3px] h-full">
        Coded by{" "}
        <a
          href="https://luishenrique-dev.com.br/"
          className="flex items-center gap-[3px] underline"
          target="_blank"
        >
          Luis Henrique <FiExternalLink />
        </a>{" "}
        |
      </div>
      <div className="flex gap-2">
        <a href="https://www.instagram.com/luissshc_/" target="_blank">
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/luis-henrique-6a7425165/"
          target="_blank"
        >
          <AiOutlineLinkedin />
        </a>
        <a href="https://github.com/luissshc29" target="_blank">
          <AiOutlineGithub />
        </a>
      </div>
    </footer>
  );
}
