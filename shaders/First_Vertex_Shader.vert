#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec2 TexCoords;
out vec3 FragPos;

void main()
{
	mat4 MVP = projection * view * model;
	gl_Position = MVP * vec4(aPos, 1.0);
	FragPos = aPos;
	TexCoords = aTexCoord;
}